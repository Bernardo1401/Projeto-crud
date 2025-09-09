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
                <h1 className={styles.apiTitle}>Informações da API-Octagon</h1>
                <p className={styles.apiDescription}>
                    Esta aplicação utiliza a API pública do UFC, que fornece dados detalhados sobre lutadores, eventos e estatísticas. A API é mantida pela comunidade e está disponível para uso gratuito.
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
                    <h2 className={styles.cardTitle}>📖 Documentação Oficial da API</h2>
                    <p className={styles.descriptionDoc}>
                        Acesse a documentação completa e detalhada da API Octagon. 
                        Encontre guias de implementação, exemplos práticos, autenticação, 
                        limites de requisições e muito mais para integrar perfeitamente 
                        com nossa plataforma de dados do UFC.
                    </p>
                    <Button type="primary" href="https://www.octagon-api.com/" target="_blank">
                        📋 Acessar Docs
                    </Button>
                </div>
                <div className={styles.cardPoints}>
                    <h2 className={styles.cardTitle}>Aqui você encontra os endpoints da API:</h2>
                    <ul className={styles.pointsList}>
                        <li className={styles.pointItem}><span>/fighters</span>: Informações sobre todos os lutadores registrados.</li>
                        <li className={styles.pointItem}><span>/division/:divisionId</span>: Informações sobre uma divisão específica.</li>
                        <li className={styles.pointItem}><span>/rankings</span>: Detalhes sobre os rankings dos lutadores.</li>
                        <li className={styles.pointItem}><span>/fighter/:fighterId</span>: Informações sobre um lutador específico.</li>
                    </ul>
                </div>
                <div className={styles.cardTable}>
                    <h2 className={styles.cardTitle}>Dados Retornados pela API</h2>
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
                                <td className={styles.tableCell}>name</td>
                                <td className={styles.tableCell}>String</td>
                                <td className={styles.tableCell}>Nome completo do lutador</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCell}>division</td>
                                <td className={styles.tableCell}>String</td>
                                <td className={styles.tableCell}>Categoria de peso do lutador</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCell}>wins</td>
                                <td className={styles.tableCell}>Number</td>
                                <td className={styles.tableCell}>Número total de vitórias</td>
                            </tr>
                            <tr>
                                <td className={styles.tableCell}>losses</td>
                                <td className={styles.tableCell}>Number</td>
                                <td className={styles.tableCell}>Número total de derrotas</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={styles.cardEx}>
                <h2 className={styles.cardTitle}>Exemplo de Resposta da API</h2>
                <p className={styles.descriptionTable}>Aqui está um exemplo de como os dados dos lutadores são retornados pela API:</p>
                <pre className={styles.codeBlock}>
{`{
    "data": {
        "fighters": [
            {
                "id": 1,
                "name": "Conor McGregor",
                "division": "Lightweight",
                "stats": {
                    "wins": 22,
                    "losses": 6
                }
            },
            {
                "id": 2,
                "name": "Khabib Nurmagomedov",
                "division": "Lightweight",
                "stats": {
                    "wins": 29,
                    "losses": 0
                }
            }
        ]
    }
}`}
                </pre>
            </div>
        </div>
    );
}  