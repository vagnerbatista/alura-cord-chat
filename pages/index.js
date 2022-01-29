import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function Titulo(props) {
  const Tag = props.tag || 'h1';
  const Cor = props.cor || appConfig.theme.colors.neutrals['000'];
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${Cor};
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

export default function PaginaInicial() {
  const [username, setUserName] = React.useState('vagnerbatista');
  const [valorMin, setUsermin] = React.useState(false);
  const roteamento = useRouter();
  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[100],
          backgroundImage: 'url(https://icdn.digitaltrends.com/image/digitaltrends/text-message-phone-lifestyle-feature.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
        styleSheet={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'space-between',
          Height: '40%', minHeight: '550px',
              width: '100%', maxWidth: '380px',
              borderRadius: '10px', padding: '0px', margin: '0px',
              boxShadow: '0 20px 10px 0 rgb(0 0 0 / 20%)',
              opacity: '97%', paddingTop: '120px',
              backgroundColor: appConfig.theme.colors.neutrals[900]
        }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              Height: '40%', minHeight: '350px',
              width: '100%', maxWidth: '450px',
              borderRadius: '50px', padding: '20px', margin: '20px',
              border: '0px solid',
              borderColor: appConfig.theme.colors.primary[900],
              boxShadow: '0 20px 10px 0 rgb(0 0 0 / 20%)',
              opacity: '92%',
              backgroundColor: appConfig.theme.colors.neutrals[600]
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={ function (event) {
                event.preventDefault();
                roteamento.push('/chat');
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '100%' }, textAlign: 'center', marginBottom: '10px', marginTop: '67px'
              }}
            >
              {/* Photo Area */}
              <Box
                styleSheet={{
                  top: '-110px',
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxWidth: '170px',
                  padding: '10px',
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  border: '0px solid',
                  borderColor: appConfig.theme.colors.primary[900],
                  borderRadius: '50%',
                  flex: 1,
                  minHeight: '170px',
                }}
              >
                <Image
                  styleSheet={{
                    borderRadius: '50%'
                  }}
                  src={ valorMin != true ? `https://github.com/${username.toLocaleLowerCase().replace(" ", "")}.png`:
                   `https://www.inovegas.com.br/site/wp-content/uploads/2017/08/sem-foto.jpg` }
                />
              </Box>
              {/* Photo Area */}
              <Text style={{ padding: '15px' }}>
                <Titulo tag="h3" cor={appConfig.theme.colors.primary[600]}> { valorMin != true ? username+"," : "Vamos começar?"}</Titulo>
                <Titulo tag="h2"> { valorMin != true ? "bem vindo de volta!" : "digite seu usuário."} </Titulo>
              </Text>

              <TextField value = {username.toLocaleLowerCase().replace(" ", "")}
                onChange={function (event){
                  //Onde está o valor?
                  setUsermin(event.target.value.length < 3 ? true : false)
                  console.log(valorMin);
                  //Trocar o valor da variavel
                  //Através do React e avise quem precisa
                  const valor = event.target.value;
                  console.log(valor);
                  setUserName(valor);
                }}
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[100],
                    mainColorHighlight: appConfig.theme.colors.primary[600],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  }
                }}
              />
              <Button
                type='submit'
                label='Vamos lá!'
                disabled = {valorMin}
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals[999],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600]
                }}
              />
              <Text variant="body3" styleSheet={{ marginTop: '35px', color: appConfig.theme.colors.neutrals["000"] }}>
                {appConfig.name}
              </Text>
            </Box>
            {/* Formulário */}
          </Box>
        </Box>
      </Box>
    </>
  );
}