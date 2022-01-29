import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import react from 'react';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    function handleNovaMensagem(novaMensagem) {
        if (novaMensagem != "") {


            const data = new Date;
            const mensagem = {
                id: listaDeMensagens.length + 1,
                de: 'vagnerbatista',
                texto: novaMensagem,
                data: `${data.getDay().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`,
                hora: `${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}`
            }
            setListaDeMensagens([
                mensagem,
                ...listaDeMensagens
            ]);
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
                    height: '70%',
                    maxWidth: '80%',
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
                            left: '5px',
                            top: '-8px',
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
                            type="text"
                            styleSheet={{
                                width: '100%',
                                height: '50px',
                                border: '0px',
                                resize: 'none',
                                borderRadius: '30px ',
                                padding: '6px 70px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '10px',
                                marginLeft: '10px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
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
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 2,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
                margin: '5px'
            }}
        >
            {
                props.mensagens.map((mensagem) => {
                    return (
                        <Text
                            key={mensagem.id}
                            tag="li"
                            styleSheet={{
                                borderRadius: '5px',
                                marginRight: '7px',
                                padding: '7px',
                                textAlign: 'right',
                                marginBottom: '15px',
                                backgroundColor: appConfig.theme.colors.primary[900],
                                hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[300],
                                }
                            }}
                        >
                            <Box
                                styleSheet={{
                                    marginBottom: '8px'
                                }}
                            >
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginTop: '7px',
                                        marginRight: '7px',
                                        color: appConfig.theme.colors.neutrals[900],
                                    }}
                                    tag="span"
                                >
                                    {mensagem.data} {mensagem.hora}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '15px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[900]
                                    }}
                                    tag="strong">
                                    {/*mensagem.de*/}
                                </Text>
                            </Box>
                            <Text
                                styleSheet={{
                                    fontSize: '19px',
                                    marginRight: '8px',
                                    color: appConfig.theme.colors.neutrals['000'],
                                }}>
                                {mensagem.texto}
                            </Text>
                        </Text>
                    )
                })
            }
        </Box>
    )
}