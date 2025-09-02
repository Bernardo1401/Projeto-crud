"use client";

import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css"

export default function HomePage() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Image
                    src="/img/bernardo.jpg"
                    alt="Bernardo G. M. Marques"
                    width={200}
                    height={200}
                    className={styles.profileImage}
                />
                <h1 className={styles.name}>
                    Bernardo G. M. Marques
                    <br />
                    2TDS1
                </h1>
                <p className={styles.description}>
                    Olá amante da luta, você acaba de encontrar tudo o que precisa sobre UFC, neste site teremos todos os lutadores cadastrados na organização e suas estatísticas
                </p>
                
                <Link href="/lutadores">
                    <Button 
                        type="primary" 
                        size="large"
                        icon={<UserOutlined />}
                        className={styles.button}
                    >
                        Ver Lutadores
                    </Button>
                </Link>

                <p className={styles.quote}>Faça mais do que apenas existir</p>
            </div>
        </div>
    );
}
