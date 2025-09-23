"use client";

import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import styles from "./apiinfo.module.css"

export default function ApiInfo() {
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <Image
                    src="/img/cinturao.png"
                    alt="API Info"
                    width={250}
                    height={250}
                    className={styles.apiImage}
                />
                <h1 className={styles.apiTitle}>Informações da API de Lutadores</h1>
                <p className={styles.apiDescription}>
                    Esta aplicação utiliza uma API própria para gerenciar dados de lutadores de UFC, incluindo informações detalhadas sobre biografia, cartel, conquistas e categorias de peso.
                </p>
                <Link href="/lutadores">
                    <Button 
                        type="primary" 
                        size="small"
                        icon={<UserOutlined />}
                        className={styles.button}
                    >
                        Ver Lutadores
                    </Button>
                </Link>
                <Link href="/">
                    <Button 
                        type="primary" 
                        size="small"
                        icon={<UserOutlined />}
                        className={styles.button01}
                    >
                        Voltar para Home
                    </Button>
                </Link>
            </div>
            <div className={styles.cardsContainer}>
                <div className={styles.cardDoc}>
                    <h2 className={styles.cardTitle}>📖 Documentação da API</h2>
                    <p className={styles.descriptionDoc}>
                        API RESTful para gerenciamento completo de lutadores UFC. 
                        Suporte para operações CRUD, upload de fotos, filtros por categoria,
                        gestão de cartéis e sistema de destaques para a página inicial.
                    </p>
                    <Button 
                        type="primary" 
                        href="https://github.com/Bernardo1401/proejto_back"
                        target="_blank"
                        className={styles.button}
                    >
                        📋 Documentação 
                    </Button>
                </div>
                <div className={styles.cardPoints}>
                    <h2 className={styles.cardTitle}>Endpoints Disponíveis:</h2>
                    <ul className={styles.pointsList}>
                        <li className={styles.pointItem}><span>GET /lutadores</span>: Lista todos os lutadores cadastrados.</li>
                        <li className={styles.pointItem}><span>GET /lutadores/:id</span>: Busca um lutador específico pelo ID.</li>
                        <li className={styles.pointItem}><span>POST /lutadores</span>: Cria um novo lutador (com upload de foto).</li>
                        <li className={styles.pointItem}><span>PUT /lutadores/:id</span>: Atualiza dados de um lutador existente.</li>
                        <li className={styles.pointItem}><span>DELETE /lutadores/:id</span>: Remove um lutador do sistema.</li>
                    </ul>
                </div>
                <div className={styles.cardTable}>
                    <h2 className={styles.cardTitle}>Estrutura dos Dados</h2>
                    <table className={styles.dataTable}>
                        <thead>
                            <tr>    
                                <th className={styles.tableHeader}>Campo</th>
                                <th className={styles.tableHeader}>Tipo</th>
                                <th className={styles.tableHeader}>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={styles.tableCell}>id</td>
                                <td className={styles.tableCell}>Number</td>
                                <td className={styles.tableCell}>Identificador único do lutador</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCell}>nome</td>
                                <td className={styles.tableCell}>String</td>
                                <td className={styles.tableCell}>Nome completo do lutador</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCell}>categoria_peso</td>
                                <td className={styles.tableCell}>String</td>
                                <td className={styles.tableCell}>Categoria de peso do lutador</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCell}>cartel_vitorias</td>
                                <td className={styles.tableCell}>Number</td>
                                <td className={styles.tableCell}>Número total de vitórias</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCell}>estilo_principal</td>
                                <td className={styles.tableCell}>String</td>
                                <td className={styles.tableCell}>Estilo de luta principal</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={styles.cardEx}>
                <h2 className={styles.cardTitle}>Exemplo de Resposta da API</h2>
                <p className={styles.descriptionTable}>Exemplo de como os dados dos lutadores são retornados pela API:</p>
                <pre className={styles.codeBlock}>
{`{
    "success": true,
    "data": [
        {
            "id": 1,
            "nome": "Conor McGregor",
            "categoria_peso": "Lightweight",
            "alcance_cm": 188,
            "estilo_principal": "Boxing/Karate",
            "biografia": "Lutador irlandês conhecido por seu estilo único...",
            "cartel_vitorias": 22,
            "cartel_derrotas": 6,
            "cartel_empate": 0,
            "principais_conquistas": "Ex-Campeão dos Pesos Pena e Lightweight",
            "hall_da_fama": false,
            "destaque_home": true,
            "foto_url": "/uploads/conor-mcgregor.jpg",
            "genero": "Masculino"
        },
        {
            "id": 2,
            "nome": "Amanda Nunes",
            "categoria_peso": "Bantamweight",
            "alcance_cm": 175,
            "estilo_principal": "Muay Thai/BJJ",
            "biografia": "Considerada a maior lutadora de todos os tempos...",
            "cartel_vitorias": 22,
            "cartel_derrotas": 5,
            "cartel_empate": 0,
            "principais_conquistas": "Ex-Campeã Dupla (Galo e Pena Feminino)",
            "hall_da_fama": true,
            "destaque_home": true,
            "foto_url": "/uploads/amanda-nunes.jpg",
            "genero": "Feminino"
        }
    ]
}`}
                </pre>
            </div>
        </div>
    );
}