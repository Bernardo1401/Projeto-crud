"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton, Button, Card, Statistic, Tag } from "antd";
import { ArrowLeftOutlined, TrophyOutlined, StarOutlined, UserOutlined, GlobalOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import styles from "./id.module.css";

export default function DetalhesLutador() {
    const apiUrl = "http://localhost:4000/api";
    const [lutador, setLutador] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const { id } = params;
    const defaultImage = "/default-fighter.jpg";

    useEffect(() => {
        const fetchLutador = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/lutadores/${id}`);
                setLutador(response.data);
            } catch (err) {
                setError(err.message);
                toast.error("Erro ao carregar dados do lutador");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchLutador();
        }
    }, [apiUrl, id]);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingContainer}>
                    <Skeleton.Image style={{ width: 300, height: 400 }} />
                    <div className={styles.loadingContent}>
                        <Skeleton active />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.errorContainer}>
                    <h2>Erro ao carregar lutador</h2>
                    <p>{error}</p>
                    <Link href="/lutadores">
                        <Button type="primary" icon={<ArrowLeftOutlined />}>
                            Voltar para lista
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (!lutador) {
        return (
            <div className={styles.container}>
                <div className={styles.errorContainer}>
                    <h2>Lutador não encontrado</h2>
                    <Link href="/lutadores">
                        <Button type="primary" icon={<ArrowLeftOutlined />}>
                            Voltar para lista
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Header com navegação */}
            <div className={styles.header}>
                <Link href="/lutadores" className={styles.backButton}>
                    <Button 
                        icon={<ArrowLeftOutlined />} 
                        size="large"
                        className={styles.backBtn}
                    >
                        Voltar para Lista
                    </Button>
                </Link>
                <div className={styles.headerInfo}>
                    <h1 className={styles.pageTitle}>Perfil do Lutador</h1>
                    <p className={styles.pageSubtitle}>Informações detalhadas e estatísticas</p>
                </div>
            </div>

            {/* Layout Principal */}
            <div className={styles.mainLayout}>
                {/* Sidebar com foto e info básica */}
                <div className={styles.sidebar}>
                    <div className={styles.profileCard}>
                        <div className={styles.imageWrapper}>
                            {imageLoading && (
                                <div className={styles.imageSkeleton}>
                                    <Skeleton.Image style={{ width: "100%", height: 400 }} />
                                </div>
                            )}
                            <Image 
                                src={lutador.foto_url || defaultImage}
                                alt={lutador.nome}
                                width={350}
                                height={400}
                                className={styles.fighterImage}
                                style={{ opacity: imageLoading ? 0 : 1 }}
                                onLoad={() => setImageLoading(false)}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = defaultImage;
                                    setImageLoading(false);
                                }}
                                priority
                            />
                            {lutador.hall_da_fama && (
                                <div className={styles.hallOfFameBadge}>
                                    <StarOutlined />
                                    Hall da Fama
                                </div>
                            )}
                        </div>
                        
                        <div className={styles.profileInfo}>
                            <h2 className={styles.fighterName}>{lutador.nome}</h2>
                            <div className={styles.basicStats}>
                                <Tag className={styles.tag} icon={<UserOutlined />}>
                                    {lutador.genero}
                                </Tag>
                                <Tag className={styles.tag} icon={<TrophyOutlined />}>
                                    {lutador.categoria_peso}
                                </Tag>
                                {lutador.alcance_cm && (
                                    <Tag className={styles.tag}>
                                        Alcance: {lutador.alcance_cm}cm
                                    </Tag>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conteúdo principal */}
                <div className={styles.mainContent}>
                <div className={styles.record}>
                                <h3 className={styles.recordTitle}>
                                    <TrophyOutlined /> Cartel Profissional
                                </h3>
                                <div className={styles.recordStats}>
                                    <div className={styles.recordItem}>
                                        <span className={styles.recordNumber}>{lutador.cartel_vitorias}</span>
                                        <span className={styles.recordLabel}>Vitórias</span>
                                    </div>
                                    <div className={styles.recordItem}>
                                        <span className={styles.recordNumber}>{lutador.cartel_derrotas}</span>
                                        <span className={styles.recordLabel}>Derrotas</span>
                                    </div>
                                    <div className={styles.recordItem}>
                                        <span className={styles.recordNumber}>{lutador.cartel_empate}</span>
                                        <span className={styles.recordLabel}>Empates</span>
                                    </div>
                                </div>
                            </div>
                    {/* Informações Técnicas */}
                    <Card className={styles.infoCard} title={
                        <span className={styles.cardTitle}>
                            <GlobalOutlined /> Informações Técnicas
                        </span>
                    }>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Estilo Principal:</span>
                                <span className={styles.infoValue}>{lutador.estilo_principal || "N/A"}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Categoria de Peso:</span>
                                <span className={styles.infoValue}>{lutador.categoria_peso || "N/A"}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Alcance:</span>
                                <span className={styles.infoValue}>
                                    {lutador.alcance_cm ? `${lutador.alcance_cm} cm` : "N/A"}
                                </span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Gênero:</span>
                                <span className={styles.infoValue}>{lutador.genero || "N/A"}</span>
                            </div>
                        </div>
                    </Card>

                    {/* Conquistas */}
                    {lutador.principais_conquistas && (
                        <Card className={styles.achievementsCard} title={
                            <span className={styles.cardTitle}>
                                <StarOutlined /> Principais Conquistas
                            </span>
                        }>
                            <p className={styles.achievementsText}>
                                {lutador.principais_conquistas}
                            </p>
                        </Card>
                    )}

                    {/* Biografia */}
                    {lutador.biografia && (
                        <Card className={styles.biographyCard} title={
                            <span className={styles.cardTitle}>
                                <UserOutlined /> Biografia
                            </span>
                        }>
                            <p className={styles.biographyText}>
                                {lutador.biografia}
                            </p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
