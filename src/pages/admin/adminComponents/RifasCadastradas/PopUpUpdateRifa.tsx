import { useState, useEffect, ChangeEvent } from "react";
import style from "./RifasCadastradas.module.css";
import { IoSearch } from "react-icons/io5";
import Users from "../users/Users";
import axios from "axios";
import defaultProfilePicture from '../../../../assets/defaultProfilePic.svg';
import Loading from "./Loading";

interface User {
    id: number;
    name: string;
    email: string;
    number: string;
    picture: string;
    tradeLink: string;
}

interface PopUpUpdateRifaProps {
    setPopUpUpdateRaffle: (value: boolean) => void;
    raffleId: string;
}

export default function PopUpUpdateRifa({ setPopUpUpdateRaffle, raffleId }: PopUpUpdateRifaProps) {
    const [usersRegisterRaffle, setUsersRegisterRaffle] = useState<User[]>([]);
    const [addUser, setAddUser] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [count, setCount] = useState(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        if (count !== 0) {
            setHasMore(true); // Resetar o hasMore ao mudar o contexto de busca
            console.log(hasMore)
            setUsersRegisterRaffle([]);
            setPage(1);
            fetchUsers(true);
        }// True indica que está iniciando uma nova busca
    }, [addUser]);

    useEffect(() => {
        if (count !== 0) {
            fetchUsers(hasMore);
        } // Agora você só chama fetchUsers quando a página muda ou o `addUser` muda
    }, [page]);


    const fetchUsers = async (shouldFetchMore: boolean = true): Promise<void> => {
        if (loading || !shouldFetchMore) return; // Verifica se deve continuar a busca
        setLoading(true);
        try {
            const url = addUser
                ? `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/roulette/participants/${raffleId}`
                : `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/users`;

            const params = {
                page,
                search: undefined,
            };

            const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };

            const response = await axios.get<{ users: User[] }>(url, { params, headers });

            const newUsers = response.data.users || response.data; // Adaptar para ambos os endpoints

            setUsersRegisterRaffle((prevUsers) => [...prevUsers, ...newUsers]);

            // Se o número de usuários retornados for menor que o esperado (ex: 20 por página), não há mais para carregar
            if (newUsers.length === 0) {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Erro ao buscar usuários:", err);
            setError("Erro ao buscar usuários.");
        }

        setLoading(false);
    };
    const handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

        if (scrollHeight - scrollTop <= clientHeight + 1 && !loading && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleAddUser = async (userId: number): Promise<void> => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/raffle/add-user`, {
                raffleId: raffleId,
                userId: userId,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.status === 200) {
                alert('Usuário adicionado à rifa com sucesso!');
                setUsersRegisterRaffle(prev => [...prev, response.data]);
            }
        } catch (error) {
            console.error('Erro ao adicionar usuário à rifa:', error);
            alert('Falha ao adicionar usuário à rifa.');
        }
    };

    const handleDeleteUserRaffle = async (number: string): Promise<void> => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/raffle/remove-user`, {
                data: { raffleId: raffleId, number: number },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.status === 200) {
                alert('Usuário removido da rifa com sucesso!');
                setUsersRegisterRaffle(prev => prev.filter(user => user.number !== number));
            }
        } catch (error) {
            console.error('Erro ao remover usuário da rifa:', error);
            alert('Falha ao remover usuário da rifa.');
        }
    };

    const searchText = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSearchQuery(e.target.value);
        setPage(1);
        setLoading(true);

        if (e.target.value.length <= 3) {
            // Se o campo de busca for apagado, restaurar o estado padrão de busca
            setUsersRegisterRaffle([]);
            setHasMore(true)
            fetchUsers(true); // Executa a busca padrão
            setLoading(false);
        }
        else {
            if (!addUser) {
                axios.get<{ users: User[] }>(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/users`, {
                    params: {
                        page,
                        search: e.target.value
                    },
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
                ).then(res => {
                    setUsersRegisterRaffle([]);
                    setLoading(false);

                    setUsersRegisterRaffle(res.data.users);
                    console.log("oi", res.data.users, usersRegisterRaffle)

                }).catch(err => {
                    setLoading(false);

                    setError(err.response.data);
                })

            } else {
                axios.get<User[]>(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/roulette/participants/raffle/${raffleId}`, {
                    params: {
                        page,
                        name: e.target.value
                    },
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
                ).then(res => {
                    setUsersRegisterRaffle(res.data);
                    setLoading(false);

                    console.log("oi2", res.data, usersRegisterRaffle)
                }).catch(err => {
                    setLoading(false);

                    setError(err.response.data);
                })
            }
        }
    }

    return (
        <div className={style.ContainerPopUpUpdateRifa}>
            <div className={style.ContentPopUpUpdateRifa}>
                <div className={style.ButtonExitPopUpUpdate}>
                    <button onClick={() => setPopUpUpdateRaffle(false)} className={style.ButtonExitUpdateStyle}>x</button>
                </div>
                <div className={style.ContainerSearchMember}>
                    <div>
                        <div className={style.inputNavBarContainer}>
                            <IoSearch className={style.searchIconMember} />
                            <input
                                type="text"
                                className={style.inputNavBarMember}
                                placeholder="Pesquisar por nome"
                                value={searchQuery}
                                onChange={(e) => searchText(e)}

                            />
                            <div className={style.ButtonAddMember} onClick={() => { setSearchQuery(""); setAddUser(!addUser) }
                            }>
                                {addUser ? "+" : "-"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.Data}>
                    <div className={style.LineMember}></div>
                    <div className={style.ContentUsersPopUp} onScroll={handleScroll}>
                        {usersRegisterRaffle.length === 0 && !loading && count !== 0 && (
                            <p>Nenhum participante encontrado.</p>  // Fallback quando o array estiver vazio
                        )}
                        {count == 0 && (
                            <div className={style.ButtonAddMember2} onClick={() => { setSearchQuery(""); setAddUser(!addUser); setCount(1)  }
                            }>
                                {addUser && "Mostrar Usuários"}
                            </div>
                        )}
                        {usersRegisterRaffle.map((person: User) => (
                            <Users
                                key={person.id}  // Adicionar key para melhorar a performance do React
                                image={person.picture === "default" ? defaultProfilePicture :
                                    (person.picture).startsWith('https://static-cdn.jtvnw.net') ?
                                        person.picture : `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${person.picture}`}
                                name={person.name}
                                email={person.email}
                                tradeLink={person.tradeLink}
                                onnumberChange={() => { }}
                                onDeleteUserRaffle={() => handleDeleteUserRaffle(person.number)}
                                onAddUser={() => handleAddUser(person.id)}
                                onDeleteUser={() => { }}
                                context={addUser ? "ParticipantsRafle" : "addParticipantsRaflle"}
                                id={0}
                                charge={""}
                                onChargeChange={function (id: number, newCharge: string): void {
                                    throw new Error("Function not implemented.");
                                }}
                                number={""}
                            />
                        ))}
                        {loading && <Loading />}
                    </div>
                </div>
            </div>
        </div>
    );
}
