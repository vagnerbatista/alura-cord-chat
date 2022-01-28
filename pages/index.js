import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';

function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
    `}</style>
  );
}

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

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
  const username = 'vagnerbatista';

  return (
    <>
      <GlobalStyle />
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[100],
          backgroundImage: 'url(https://cdn.pixabay.com/photo/2019/11/04/01/11/cellular-4599956_960_720.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '350px',
            borderRadius: '10px', padding: '20px', margin: '20px',
            boxShadow: '0 20px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '100%' }, textAlign: 'center', marginBottom: '10px'
            }}
          >


            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '240px',
                padding: '15px',
                backgroundColor: appConfig.theme.colors.neutrals[900],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '50%',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%'
                }}
                src={`https://github.com/${username}.png`}
              />
            </Box>
            {/* Photo Area */}           
              <Text style={{padding: '15px'}}>
                  <Titulo tag="h3" cor={appConfig.theme.colors.primary[600]}> {username},</Titulo>
                  <Titulo tag="h2"> bem vindo de volta!</Titulo>
              </Text>
              
            <TextField
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[600],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                }                
              }}
            />
            <Button
              type='submit'
              label='Vamos lá!'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals[999],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600]
              }} 
            />
            <Text variant="body3" styleSheet={{ marginTop: '32px', color: appConfig.theme.colors.neutrals["000"] }}>
              {appConfig.name}
            </Text>
          </Box>
          {/* Formulário */}
        </Box> 
      </Box>
    </>
  );
}