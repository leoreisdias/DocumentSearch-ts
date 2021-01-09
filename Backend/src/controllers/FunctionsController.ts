require('dotenv').config();

import { Request, Response } from 'express'
import Function from '../models/Function'
//const parseStringAsArray = require('../utils/parseStringAsArray');

import { getRepository } from 'typeorm';

export default {

    async show(req: Request, res: Response) {
        const data = req.params;

        const functionRepository = await getRepository(Function);

        const findFunction = await functionRepository.findOneOrFail(data.id_function);

        return res.status(200).json(findFunction);
    },

    async store(req: Request, res: Response) {
        const {
            nome,
            tags,
            pathurl,
            description,
            purpose,
            parameters,
            saida,
            code
        } = req.body;


        const tagsArray = tags?.split(',').map((tags: any) => tags.trim());
        const tagsToUpperCase = tagsArray?.map((tags: any) => tags.toUpperCase());

        const functionRepository = await getRepository(Function);

        const data = {
            nome,
            pathurl,
            description,
            purpose,
            parameters,
            saida,
            code
        }

        try {
            const function_created = await functionRepository.create(data);
            await functionRepository.save(function_created);
            return res.status(201).json({ function_created });
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: "Função já cadastrada!" });
        }
    },

    // async index(req: Request, res: Response) {
    //     const functions = await Function.find();
    //     if (!functions)
    //         return res.json({ message: 'Problema na Conexão. Por favor, tentar novamente mais tarde.' })

    //     return res.json({ functions });
    // },

    async update(req: Request, res: Response) {
        const {
            nome,
            tags,
            pathurl,
            description,
            purpose,
            parameters,
            saida,
            code
        } = req.body;

        const { id } = req.params

        const data = {
            nome,
            tags,
            pathurl,
            description,
            purpose,
            parameters,
            saida,
            code
        }

        const functionRepository = await getRepository(Function);

        try {
            const function_updated = await functionRepository.update(id, data);
            return res.status(200).json({ function_updated });

        } catch (err) {
            return res.status(400).json({ message: 'Update failed' });
        }
    },

    async destroy(req: Request, res: Response) {
        const { id } = req.params;
        const functionRepository = await getRepository(Function);

        try {
            await functionRepository.delete(id)

            return res.status(200).json({ message: 'Excluido com sucesso!' })
        } catch (err) {
            return res.status(400).json({ message: 'Não foi possível excluir! Tente novamente mais tarde!' })
        }
    }
};