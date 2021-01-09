import React, { useEffect, useState } from 'react';

import logoImg from '../../assets/images/logo.png'
import { PacmanLoader } from 'react-spinners';
import Input from '../../components/Input';
import api from '../../services/api';

import 'semantic-ui-css/semantic.min.css'

import './styles.css';
import Textarea from '../../components/Textarea';
import { useHistory, useParams } from 'react-router-dom';

function DataPost() {
    const [nome, setNome] = useState('');
    const [pathurl, setPathurl] = useState('');
    const [description, setDescription] = useState('');
    const [purpose, setPurpose] = useState('');
    const [parameters, setParameters] = useState('');
    const [saida, setSaida] = useState('');
    const [code, setCode] = useState('');
    const [id, setId] = useState();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isUpdate, setIsUpdate] = useState(false);

    const history = useHistory();
    const params = useParams();

    useEffect(() => {

        const loadDataToUpdate = async () => {
            const data: any = params;

            if (data.id) {
                const response = await api.get(`functions/${data.id_function}`);

                setNome(response.data.nome);
                setPathurl(response.data.pathurl);
                setDescription(response.data.description);
                setPurpose(response.data.purpose);
                setParameters(response.data.parameters);
                setSaida(response.data.saida);
                setCode(response.data.code);

                setId(response.data.id_function);

                setIsUpdate(true);
            }

            else
                return;
        }

        loadDataToUpdate();
    }, []);


    async function handleSubmit() {
        setIsSubmitting(true);

        if (!isUpdate) {
            await api.post('/functions', {
                nome,
                pathurl,
                description,
                purpose,
                parameters,
                saida,
                code
            })
        } else {
            await api.put(`functions/${id}`, {
                nome,
                pathurl,
                description,
                purpose,
                parameters,
                saida,
                code
            })
        }

        history.push('/agil')
    }

    return (isSubmitting ? <PacmanLoader size={100} color="yellow" /> :
        <div id="page-landing">
            <div id="page-landing-content" className="container">

                <div className="post-container">

                    <img className="logoImage" src={logoImg} alt="agil" />
                    <form onSubmit={handleSubmit} className="formPost">

                        <div className="group_1">
                            <span>
                                <label htmlFor="nome">Nome da Função: </label>
                                <Input label="Nome" name="nome" onChange={(e: any) => { setNome(e.target.value) }} value={nome}
                                />
                            </span>

                            <span>
                                <label htmlFor="pathurl">Caminho da Função e arquivo: </label>
                                <Input label="Path URL" name="pathurl" onChange={(e: any) => { setPathurl(e.target.value) }} value={pathurl}
                                />
                            </span>
                        </div>

                        <div className="group_2">
                            <span>
                                <label htmlFor="parameter">Parâmetros: </label>
                                <Input label="Parâmetros" name="parameter" onChange={(e: any) => { setParameters(e.target.value) }} value={parameters}
                                />
                            </span>
                            <span>
                                <label htmlFor="purpose">Objetivo: </label>
                                <Input label="Objetivo" name="purpose" onChange={(e: any) => { setPurpose(e.target.value) }} value={purpose}
                                />
                            </span>
                        </div>

                        <div className="group_3">
                            <span>
                                <label htmlFor="description">Descrição/Observações: </label>
                                <Textarea label="" name="description" onChange={(e: any) => { setDescription(e.target.value) }} value={description}
                                />
                            </span>

                            <span>
                                <label htmlFor="code">Código: </label>
                                <Textarea label="" name="code" onChange={(e: any) => { setCode(e.target.value) }} value={code}
                                />
                            </span>
                        </div>

                        <div className="group_4">
                            <label htmlFor="output">Saída: </label>
                            <Input label="Saída" name="output" onChange={(e: any) => { setSaida(e.target.value) }} value={saida}
                            />
                        </div>

                        <button type="submit" className="btnSubmit">{isUpdate ? 'Atualizar' : 'Cadastrar'}</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default DataPost;