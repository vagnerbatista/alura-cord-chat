import { useState } from 'react'
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'
import { supabase } from '../src/supabaseClient'

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

     function escutaMensagensEmTempoReal(adicionaMensagem) {
        return supabase
            .from('mensagens')
            .on('INSERT', (respostaLiveInsert) => {
                setListaDeMensagens((valorAtualDaLista) =>{
                    return [
                        respostaLiveInsert.new,
                        ...valorAtualDaLista
                    ]
                });
            }).on('UPDATE', (respostaLiveUpdate) => {
                setListaDeMensagens((valorAtualDaListaMensagens) =>
                valorAtualDaListaMensagens.map((mensagem) =>
                mensagem.id === respostaLiveUpdate.old.id ? 
                 ({
                    ...mensagem,
                    texto: respostaLiveUpdate.new.texto,
                    data: respostaLiveUpdate.new.data,
                    hora: respostaLiveUpdate.new.hora
                    }) : (mensagem)));
            })
            .subscribe();
    }

    React.useEffect(() => {
         supabase
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log(data);
                setListaDeMensagens(data)
            });
        escutaMensagensEmTempoReal(() => {});
    }, [])

     function handleNovaMensagem(novaMensagem) {
        if (novaMensagem != "") {
            let data = new Date;
            let mensagem = {
                de: usuarioLogado,
                para: 'vagnerbatista',
                texto: novaMensagem,
                data: `${data.getDay().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`,
                hora: `${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}`
            };

            supabase
                .from('mensagens')
                .insert(
                    mensagem
                )
                .then(() => {});

            setMensagem('');
        }
    }
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://icdn.digitaltrends.com/image/digitaltrends/text-message-phone-lifestyle-feature.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '10px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '95%',
                    maxWidth: '98%',
                    maxHeight: '95vh',
                    padding: '10px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '10px',
                        padding: '10px',
                    }}
                >
                    <MessageList mensagens={listaDeMensagens} />
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            justifyContent: 'center',
                            position: 'relative',
                            marginTop: '7px'
                        }}
                    >
                        <Box
                            styleSheet={{
                                width: '66px',
                                height: '66px',
                                left: '6px',
                                top: '-9px',
                                borderRadius: '50%',
                                position: 'absolute',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '55px',
                                    height: '55px',
                                    top: '6px',
                                    left: '5.5px',
                                    position: 'absolute',
                                    borderRadius: '50%',
                                    border: '20px',
                                    borderColor: appConfig.theme.colors.primary[600],
                                }}
                                src={`https://github.com/vagnerbatista.png`}
                            />
                        </Box>
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}

                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                    setMensagem("");
                                }
                            }}

                            placeholder="Insira sua mensagem aqui"
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                height: '50px',
                                border: '0px',
                                resize: 'none',
                                borderRadius: '30px ',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                padding: '4px 40px 4px 40px',
                                marginRight: '10px',
                                marginLeft: '40px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker onStickerClick={(sticker) => {
                            handleNovaMensagem(`:sticker: ${sticker}`)

                        }} />
                        <Box styleSheet={{
                            marginRight: '5px'
                        }}>
                            <Button
                                type='button'
                                iconName='arrowRight'
                                size='lg'
                                onClick={() => {
                                    handleNovaMensagem(mensagem);
                                    setMensagem("");
                                }}
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals[999],
                                    mainColor: appConfig.theme.colors.primary[600],
                                    mainColorLight: appConfig.theme.colors.primary[500],
                                    mainColorStrong: appConfig.theme.colors.primary[400]
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat {appConfig.name}
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 2,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
                alignItems: 'end',
                margin: '5px'
            }}
        >
            {
                props.mensagens.map((mensagem) => {
                    return (
                        <Text
                            key={mensagem.id}
                            tag="li"

                            onKeyPress={(event) => {
                                console.log(event);
                            }}
                            styleSheet={{
                                borderRadius: '10px',
                                marginRight: '30px',
                                padding: '7px',
                                textAlign: 'right',
                                marginTop: '10px',
                                marginBottom: '15px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                }
                            }}
                        >
                            <Box
                                styleSheet={{
                                    marginBottom: '8px'
                                }}
                            >
                                {mensagem.texto !== 'Mensagem apagada' && (
                                    <Button
                                    variant='secondary'
                                    colorVariant='dark'
                                    iconName='trash'
                                    label='Apagar'
                                    rounded='md'
                                    size='xs'
                                    onClick={(event) => {
                                        const result = confirm('Deseja apagar a mensagem?')
                                        if (result === true) {
                                            let data = new Date;
                                            supabase
                                            .from('mensagens')
                                            .update({
                                                texto: 'Mensagem apagada',
                                                data: `${data.getDay().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`,
                                                hora: `${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}`
                                            })
                                            .match({ id: mensagem.id })
                                            .then()
                                        }                
                                    }}
                                />
                                )}
                            </Box>
                            
                            <Text
                                styleSheet={{
                                    fontSize: mensagem.texto !== 'Mensagem apagada' ? '17px': '12px',
                                    marginRight: '5px',
                                    marginBottom: '8px',
                                    color: mensagem.texto !== 'Mensagem apagada' ?
                                     appConfig.theme.colors.neutrals['000'] : appConfig.theme.colors.neutrals[400],
                                }}>
                                {mensagem.texto.startsWith(':sticker:')
                                    ? (
                                        <Image styleSheet={{
                                            maxWidth: '200px',
                                            maxHeight: '200px'
                                        }}
                                            src={mensagem.texto.replace(':sticker:', '')}></Image>
                                    )
                                    : (
                                        mensagem.texto
                                    )}
                            </Text>
                            <Text
                                styleSheet={{
                                    position: 'relative',
                                    top: '25px',
                                    fontSize: '12px',
                                    marginTop: '-16px',
                                    marginRight: '-16px',
                                    color: appConfig.theme.colors.primary[600],
                                }}
                                tag="span"
                            >
                                {mensagem.data} {mensagem.hora}
                            </Text>
                        </Text>
                    )
                })
            }
        </Box>
    )
}