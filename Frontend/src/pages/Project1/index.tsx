import React, { useEffect, useState } from 'react';

import logoImg from '../../assets/images/logo.png'
import { PacmanLoader } from 'react-spinners';
import { Accordion, Icon } from 'semantic-ui-react';
import Input from '../../components/Input';
import api from '../../services/api';

import 'semantic-ui-css/semantic.min.css'
import { CopyBlock, dracula } from "react-code-blocks";
import { MdDeleteSweep } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'


import './styles.css';
import { Link } from 'react-router-dom';


function Project1() {
    const [text, setText] = useState('')
    const [funct, setFunct] = useState([])
    const [searchFlag, setSearchFlag] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setSearchFlag(false);
        setActiveIndex(-1);
    }, [searchFlag, funct]);

    async function search() {
        if (text !== '') {
            const response = await api.get('/search', {
                params: {
                    text,
                }
            })
            setFunct(response.data.functions);
        } else {
            setFunct([])
            setSearchFlag(true);
        }
    }

    const debounceEvent = (fn: Function, wait = 1000, time: any) => (...args: any) => {
        clearTimeout(time)
        time = setTimeout(() => {
            fn(...args)
        }, wait)
    }

    function handleKeyUp() {
        search()
    }

    function handleClickNameFunction(index: number) {
        const newIndex = activeIndex === index ? -1 : index
        setActiveIndex(newIndex)
    }

    async function handleDeleteClick(nome: string, id: number) {

        let confirmDelete = prompt("Confirme a exclusão digitando o nome da função que você deseja excluir: ");

        if (confirmDelete !== nome) {
            alert('Nome incorreto!');
            return;
        }
        else {
            try {
                await api.delete(`/functions/${id}`)
                search();
                return;
            } catch (err) {
                alert('Falha ao deletar! Tente novamente mais tarde!');
                document.location.reload(true);
            }
        }
    }

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">

                <div className="logo-container">

                    <img className="logoImage" src={logoImg} alt="agil" />
                    <Link to="/data-post">
                        <button className="btnCadastrar">Cadastrar Função</button>
                    </Link>
                    <form onSubmit={search} className="formInput">
                        <Input label="teste" name="pato" onChange={(e: any) => { setText(e.target.value) }} onKeyUp={debounceEvent(handleKeyUp, 1000, 500)}
                        />
                    </form>

                </div>

                <div className="searchResults">
                    {Object.keys(funct).length !== 0 ? funct.map((funcao: any, index: number) => {
                        return (
                            <Accordion fluid styled className="secFunction" key={funcao.id_function}>
                                <Accordion.Title
                                    active={activeIndex === index}
                                    index={index}
                                    onClick={() => handleClickNameFunction(index)}
                                    className="functionName"
                                >
                                    <Icon name='dropdown' />
                                    <strong>{funcao.nome} - {funcao.pathurl}</strong>
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === index} className="AccordionContent">
                                    <div className="editDeleteOptions">
                                        <Link to={`/data-update/${funcao.id_function}`}>
                                            <FaEdit className="iconEdit" size={30} color="white" />
                                        </Link>
                                        <MdDeleteSweep className="iconDelete" size={30} color="red" onClick={() => handleDeleteClick(funcao.nome, funcao.id_function)} />
                                    </div>
                                    <p className="functionPurpose">Objetivo: {funcao.purpose}</p> <br />
                                    <span className="functionParameters">Parâmetros: {funcao.parameters}</span><br />
                                    <p className="functionDesc">Observações: {funcao.description}</p><br />
                                    <legend className="inputOutputLegend">Código:</legend>
                                    <CopyBlock
                                        text={funcao.code.replace(/{/gi, "{#").split('#').join('\n ').replace(/;/gi, ";#").split('#').join('\n  ')}
                                        language="php"
                                        showLineNumbers={false}
                                        theme={dracula}
                                    /><br />
                                    <legend className="inputOutputLegend">Saída:</legend>
                                    <span className="functionOutput">{funcao.saida}</span>
                                </Accordion.Content>

                            </Accordion>

                        )
                    }) : <span className="secPacman"><PacmanLoader size={50} color="yellow" /></span>}
                </div>


            </div>
        </div>
    )
}

export default Project1;