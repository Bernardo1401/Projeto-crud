"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Card } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import styles from "./lutadores.module.css";
import {HomeOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";

const PAGE_SIZE_OPTIONS = ["6", "12", "24"];

export default function Lutadores() {
  const [data, setData] = useState({
    lutadores: [],
    loading: true,
    current: 1,
    pageSize: 12,
  });

  const [imageLoading, setImageLoading] = useState({});

  const handleImageLoad = (lutadorId) => {
    setImageLoading((prev) => ({ ...prev, [lutadorId]: false }));
  };

  useEffect(() => {
    const fetchLutadores = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/lutadores"
        );
        
        const lutadoresOrdenados = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        
        setData((d) => ({
          ...d,
          lutadores: lutadoresOrdenados,
          loading: false,
          current: 1,
        }));
        
        toast.success(`${lutadoresOrdenados.length} lutadores carregados com sucesso!`);
      } catch (error) {
        console.error("Erro ao carregar lutadores:", error);
        toast.error("Erro ao carregar lutadores. Verifique se a API está rodando.");
        setData((d) => ({ ...d, loading: false }));
      }
    };

    fetchLutadores();
  }, []);

  const paginatedLutadores = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.lutadores.slice(start, start + data.pageSize);
  };

  const defaultImage = "/img/default.png";

  return (
    <div className={styles.container}>
      lin
      <div className={styles.bloco}>
        <h1>Lista de Lutadores</h1>

        <Pagination
          className={styles.pagination}
          current={data.current}
          pageSize={data.pageSize}
          total={data.lutadores.length}
          onChange={(page, size) =>
            setData((d) => ({ ...d, current: page, pageSize: size }))
          }
          showSizeChanger
          pageSizeOptions={PAGE_SIZE_OPTIONS}
        />

        <div className={styles.buttonContainer}>
          <Link href="/">
            <Button 
              type="primary" 
              size="large"
              icon={<HomeOutlined  />}
              className={styles.button}
            >
              Voltar para Home
            </Button>
          </Link>
          <Link href="/lutadores/update">
            <Button 
              type="primary" 
              size="large"  
              icon={<EditOutlined  />}
              className={styles.button}
            >
              Editar Lutador
            </Button>
          </Link>
        </div>

        {data.loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Carregando lutadores...</p>
          </div>
        ) : (
          <div className={styles.cardsContainer}>
            {paginatedLutadores().map((lutador) => (
              <Link
                href={`/lutadores/${lutador.id}`}
                key={lutador.id}
                style={{ textDecoration: "none" }}
              >
                <Card
                  className={styles.fighterCard}
                  hoverable
                  cover={
                    <div className={styles.cardImageContainer}>
                      {imageLoading[lutador.id] !== false && (
                        <div className={styles.skeleton}>
                          <div className={styles.skeletonShimmer}></div>
                        </div>
                      )}
                      <img
                        alt={lutador.nome}
                        src={lutador.foto_url || defaultImage}
                        className={styles.fighterImage}
                        style={{
                          opacity: imageLoading[lutador.id] !== false ? 0 : 1,
                          transition: "opacity 0.3s ease",
                        }}
                        onLoad={() => handleImageLoad(lutador.id)}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultImage;
                          handleImageLoad(lutador.id);
                        }}
                      />
                      <div className={styles.cardOverlay}>
                        <div className={styles.weightClass}>
                          {lutador.categoria_peso || 'UFC'}
                        </div>
                        {lutador.hall_da_fama && (
                          <div className={styles.hallOfFameBadge}>
                            🏆
                          </div>
                        )}
                        {lutador.destaque_home && (
                          <div className={styles.featuredBadge}>
                            ⭐
                          </div>
                        )}
                      </div>
                    </div>
                  }
                >
                  <div className={styles.cardContent}>
                    <h3 className={styles.fighterName}>
                      {lutador.nome}
                    </h3>
                    
                    {lutador.estilo_principal && (
                      <div className={styles.fightingStyle}>
                        <span className={styles.styleIcon}>🥋</span>
                        <span>{lutador.estilo_principal}</span>
                      </div>
                    )}

                    <div className={styles.cardActions}>
                      <Button 
                        type="primary" 
                        size="small"
                        className={styles.viewMoreButton}
                      >
                        Ver Mais
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <ToastContainer 
        position="top-right" 
        autoClose={4500}
        theme="dark"
      />
    </div>
  );
}