import { Request, Response } from 'express'
import { getRepository, ILike, Like } from 'typeorm';

import Function from '../models/Function'

export default {
    async index(req: Request, res: Response) {
        const { text } = req.query;

        // const textArrayTagsParameters = parseString.parseStringAsArrayCommon(text);
        // const textToUpperCaseTagsParameters = textArrayTagsParameters.map((text: any) => text.toUpperCase());

        const functionRepository = await getRepository(Function)

        const functions = await functionRepository.find({
            where: [
                // {
                //     tags: In(textToUpperCaseTagsParameters),

                // },
                {
                    nome: ILike("%" + text + "%")
                },
                {
                    parameters: Like("%" + text + "%")

                },
                {
                    saida: Like("%" + text + "%")

                },
                {
                    pathurl: Like("%" + text + "%")
                },
                {
                    purpose: Like("%" + text + "%")

                }
            ]

        })

        return res.json({ functions })
    }
}