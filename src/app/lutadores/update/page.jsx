"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styles from './update.module.css';

export default function EditLutador() {
    const router = useRouter();
    const [lutadorId, setLutadorId] = useState("");
    const [form, setForm] = useState({
        nome: "",
        categoria_peso: "",
        alcance_cm: "",
        estilo_principal: "",
        biografia: "",
        cartel_vitorias: 0,
        cartel_derrotas: 0,
        cartel_empate: 0,
        principais_conquistas: "",
        hall_da_fama: false,
        destaque_home: false,
        foto_url: "",
        genero: "Masculino"
    });
    const [loading, setLoading] = useState(false);
    const [lutadorEncontrado, setLutadorEncontrado] = useState(false);

    const buscarLutador = async () => {
        if (!lutadorId) {
            toast.error("Digite o ID do lutador");
            return;
        }

        setLoading(true);

        try {
            const { data } = await axios.get(
                `http://localhost:4000/api/lutadores/${lutadorId}`
            );
            setForm({
                nome: data.nome || "",
                categoria_peso: data.categoria_peso || "",
                alcance_cm: data.alcance_cm || "",
                estilo_principal: data.estilo_principal || "",
                biografia: data.biografia || "",
                cartel_vitorias: data.cartel_vitorias || 0,
                cartel_derrotas: data.cartel_derrotas || 0,
                cartel_empate: data.cartel_empate || 0,
                principais_conquistas: data.principais_conquistas || "",
                hall_da_fama: data.hall_da_fama || false,
                destaque_home: data.destaque_home || false,
                foto_url: data.foto_url || "",
                genero: data.genero || "Masculino"
            });
            setLutadorEncontrado(true);
            toast.success("Lutador encontrado!");
        } catch (error) {
            toast.error("Lutador não encontrado");
            setLutadorEncontrado(false);
        } finally {
            setLoading(false);
        }
    };

    const validarFormulario = () => {
        if (!form.nome?.trim()) {
            toast.error("Nome é obrigatório");
            return false;
        }
        if (!form.categoria_peso?.trim()) {
            toast.error("Categoria de peso é obrigatória");
            return false;
        }
        if (!form.genero?.trim()) {
            toast.error("Gênero é obrigatório");
            return false;
        }
        return true;
    };

    const editarLutador = async () => {
        if (!validarFormulario()) return;

        setLoading(true);

        try {
            await axios.put(`http://localhost:4000/api/lutadores/${lutadorId}`, form);
            toast.success("✅ Lutador editado com sucesso!");
            
            setTimeout(() => {
                router.push("/lutadores");
            }, 2000);
        } catch (error) {
            toast.error("❌ Erro ao editar lutador");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
          <Link href="/">
            <Button 
              type="primary" 
              size="large"
              icon={<HomeOutlined />}
              className={styles.button}
            >
              Voltar para Home
            </Button>
          </Link>
          <Link href="/lutadores">
            <Button 
              type="primary" 
              size="large"  
              icon={<UserOutlined />}
              className={styles.button}
            >
                Voltar para Listagem
            </Button>
          </Link>
        </div>

            <h1 className={styles.title}>
                Editar Lutador
            </h1>

            <div className={styles.searchSection}>
                <input
                    type="number"
                    value={lutadorId}
                    onChange={(e) => setLutadorId(e.target.value)}
                    placeholder="ID do lutador"
                    className={styles.searchInput}
                />
                <button 
                    onClick={buscarLutador} 
                    disabled={loading}
                    className={styles.searchButton}
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </div>

            {lutadorEncontrado && (
                <div className={styles.editSection}>
                    <h2 className={styles.editHeader}>
                        Editando Lutador #{lutadorId}
                    </h2>

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Nome <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                value={form.nome}
                                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                                placeholder="Nome do lutador"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Categoria de Peso <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                value={form.categoria_peso}
                                onChange={(e) => setForm({ ...form, categoria_peso: e.target.value })}
                                placeholder="Ex: Peso Leve, Peso Médio"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Alcance (cm)
                            </label>
                            <input
                                type="number"
                                value={form.alcance_cm}
                                onChange={(e) => setForm({ ...form, alcance_cm: e.target.value })}
                                placeholder="Alcance em centímetros"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Estilo Principal
                            </label>
                            <input
                                type="text"
                                value={form.estilo_principal}
                                onChange={(e) => setForm({ ...form, estilo_principal: e.target.value })}
                                placeholder="Ex: Jiu-Jitsu, Muay Thai"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Vitórias
                            </label>
                            <input
                                type="number"
                                value={form.cartel_vitorias}
                                onChange={(e) => setForm({ ...form, cartel_vitorias: parseInt(e.target.value) || 0 })}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Derrotas
                            </label>
                            <input
                                type="number"
                                value={form.cartel_derrotas}
                                onChange={(e) => setForm({ ...form, cartel_derrotas: parseInt(e.target.value) || 0 })}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Empates
                            </label>
                            <input
                                type="number"
                                value={form.cartel_empate}
                                onChange={(e) => setForm({ ...form, cartel_empate: parseInt(e.target.value) || 0 })}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Gênero <span className={styles.required}>*</span>
                            </label>
                            <select
                                value={form.genero}
                                onChange={(e) => setForm({ ...form, genero: e.target.value })}
                                className={styles.select}
                            >
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </select>
                        </div>

                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>
                                URL da Foto
                            </label>
                            <input
                                type="url"
                                value={form.foto_url}
                                onChange={(e) => setForm({ ...form, foto_url: e.target.value })}
                                placeholder="https://exemplo.com/foto.jpg"
                                className={styles.input}
                            />
                        </div>

                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>
                                Biografia
                            </label>
                            <textarea
                                value={form.biografia}
                                onChange={(e) => setForm({ ...form, biografia: e.target.value })}
                                placeholder="Biografia do lutador"
                                rows="4"
                                className={styles.textarea}
                            />
                        </div>

                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>
                                Principais Conquistas
                            </label>
                            <textarea
                                value={form.principais_conquistas}
                                onChange={(e) => setForm({ ...form, principais_conquistas: e.target.value })}
                                placeholder="Principais conquistas e títulos"
                                rows="3"
                                className={styles.textarea}
                            />
                        </div>
                    </div>

                    <div className={styles.checkboxGroup}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={form.hall_da_fama}
                                onChange={(e) => setForm({ ...form, hall_da_fama: e.target.checked })}
                                className={styles.checkbox}
                            />
                            Hall da Fama
                        </label>

                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={form.destaque_home}
                                onChange={(e) => setForm({ ...form, destaque_home: e.target.checked })}
                                className={styles.checkbox}
                            />
                            Destaque na Home
                        </label>
                    </div>

                    <button 
                        onClick={editarLutador} 
                        disabled={loading || !form.nome?.trim() || !form.categoria_peso?.trim()}
                        className={styles.saveButton}
                    >
                        {loading ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </div>
            )}
        </div>
    );
}
