---
title: Política de privacidade
updated: 2026-10-20
---

::: draft
**RASCUNHO: precisa de revisão de um advogado.** Descrição factual de como o site funciona, escrita como texto em linguagem simples, não como orientação jurídica. Os pontos marcados com **[TO CONFIRM]** (a confirmar) ainda não foram confirmados pelo responsável pelo site. Não publicar até que estejam confirmados e revisados.
:::

::: summary
**A versão resumida:** Coletamos o que precisamos para operar a biblioteca de empréstimos, armazenamos esses dados com o nosso provedor de banco de dados e não os usamos para publicidade.
:::

## O que coletamos

- **Dados da conta:** o endereço de e-mail do usuário (verificado no cadastro) e as informações de login dele.
- **Perfil:** nome de exibição, cidade ou região, e quaisquer outros dados de perfil que o usuário decidir adicionar.
- **Publicações:** títulos, descrições, categorias, estado, região de retirada, os valores que o usuário define (taxa e valor por danos) e as fotos que ele envia.
- **Registros de empréstimos:** pedidos, entradas na fila, aprovações, marcações de entrega e de devolução (em bom estado ou danificado) e as notas relacionadas.
- **Denúncias:** as denúncias que o usuário envia e as denúncias feitas sobre ele ou sobre as publicações dele.
- **Feedback:** se o usuário usar Enviar feedback, armazenamos a mensagem dele, o tipo que ele escolheu (bug, ideia ou outro), a página em que ele estava e uma nota curta sobre o navegador dele. Se o usuário tiver feito login, o feedback fica vinculado à conta dele. Se ele adicionar um contato para resposta, também armazenamos esse contato. [TO CONFIRM: campos exatos, com base em supabase/08-feedback.sql, que ainda não existia quando este texto foi escrito.]
- **Dados técnicos básicos:** quando o usuário visita o site, os nossos provedores de hospedagem e de análise de acessos processam informações técnicas básicas, como as páginas que ele vê, a localização aproximada dele (país ou região) e o navegador e o tipo de dispositivo que ele usa. Ver "Análise de acessos e cookies", abaixo. [TO CONFIRM: tratamento dos logs do servidor e dos endereços IP pela Vercel e pela Supabase. NEEDS REVIEW.]

## Onde os dados ficam armazenados

A conta, o perfil, as publicações, os registros de empréstimos e as fotos do usuário ficam armazenados com a Supabase (banco de dados, autenticação e armazenamento de arquivos). Os dados ficam armazenados no Canadá (região da Supabase ca-central-1). O site é hospedado na Vercel.

## O que outros usuários podem ver

O perfil público do usuário fica visível para outros usuários. Ele mostra o nome de exibição, a cidade ou região (se o usuário adicionar uma), a bio, o mês e o ano em que o usuário entrou no site e as publicações dele, com as respectivas fotos. Também mostra contagens simples: quantos itens o usuário publicou, emprestou e pegou emprestado, quantos foram devolvidos em bom estado e quantos foram danificados ou perdidos (como emprestador e como tomador). O perfil não mostra para quem o usuário emprestou nem de quem ele pegou emprestado. [NEEDS REVIEW: verificado com base em components/profile-stats.tsx e na página de perfil em 2026-10-20; verificar de novo se o perfil mudar.] O endereço exato do usuário não deve ser colocado nas publicações. O endereço de e-mail do usuário nunca é mostrado publicamente. Depois que um pedido é aprovado, o emprestador e o tomador se comunicam somente pelas mensagens internas do site.

## Análise de acessos e cookies (RASCUNHO, precisa de revisão)

Usamos o Vercel Web Analytics para contar as visitas às páginas, para podermos ver quais partes do site são usadas. Com base na documentação da Vercel (página "Privacy and Compliance" da documentação, com última atualização em 2026-06-26):
- Não usa cookies de terceiros. Os visitantes são diferenciados por um hash gerado a partir da requisição recebida.
- As informações da sessão do visitante não são armazenadas permanentemente; elas são descartadas após 24 horas.
- Não coleta informações que permitiriam a alguém acompanhar o usuário em diferentes sites ou apps, e é usado apenas para estatísticas agregadas.
- Cada visualização de página pode incluir: o horário, o caminho da página, a página de origem, a localização aproximada (país, região, cidade), o sistema operacional e a versão dele, o navegador e a versão dele, e o tipo de dispositivo (celular, tablet ou computador).

Antes de uma visualização de página ser enviada, removemos do caminho da página os IDs de itens, de empréstimos e de perfis, e removemos os parâmetros de consulta e tudo o que vem depois do sinal #. Os links dos nossos e-mails (as páginas /auth/... que se abrem quando o usuário clica em um link de cadastro ou de redefinição de senha) não são enviados de forma alguma, e as demais páginas são enviadas somente pelo caminho, como /en/login. Não enviamos o ID do usuário. Não podemos alterar a página de origem, que a ferramenta de análise de acessos inclui por conta própria. [NEEDS REVIEW: com base na verificação do código feita pelo desenvolvedor em 2026-10-20.]

Não usamos esses dados para mostrar anúncios e não os vendemos.

Cookies: o site define dois tipos de cookies, ambos necessários para que ele funcione.
- Um cookie de login, definido pelo nosso provedor de login (Supabase), mantém o usuário conectado. Ele pode ser dividido em várias partes.
- Um cookie de idioma guarda o idioma escolhido pelo usuário. Ele dura 1 ano.

O site também armazena a configuração de vibração (Vibrar ao tocar) e o progresso do usuário nas telas de introdução no armazenamento local (local storage) do navegador, no próprio dispositivo do usuário. Isso não é um cookie e não é enviado para nós.

Não definimos cookies de publicidade nem de rastreamento entre sites. [NEEDS REVIEW: com base na verificação do código feita pelo desenvolvedor em 2026-10-20; verificar de novo quando algo for adicionado.]

[TO CONFIRM: com a Vercel ou no painel, pois não consta na página da documentação acima: (1) se os endereços IP são armazenados ou usados apenas brevemente para determinar a localização aproximada; (2) por quanto tempo os dados agregados de análise de acessos são mantidos; (3) onde os dados de análise de acessos são armazenados e processados. Não publicar nenhuma afirmação sobre esses pontos até que sejam verificados.]

## Como usamos os dados

Para operar o site: mostrar publicações, gerenciar filas e pedidos, permitir que emprestadores e tomadores se comuniquem, tratar denúncias e manter o site seguro.

## O que não fazemos

- Não vendemos os dados dos usuários.
- Não mostramos anúncios.
- O site não recebe pagamentos, então não coletamos dados de cartão nem bancários.

## Compartilhamento

Compartilhamos dados com os prestadores de serviço necessários para operar o site (como os provedores de banco de dados e de hospedagem). Podemos divulgar informações se a lei exigir. [TO CONFIRM / advogado: lista completa de operadores de dados.]

## Retenção e exclusão de dados

*Feedback:* se o usuário excluir a conta, o feedback dele é mantido, mas deixa de estar vinculado a ele. [TO CONFIRM: corresponde a `user_id ON DELETE SET NULL` em supabase/08-feedback.sql; falta definir o prazo de retenção e se um contato para resposta também é removido.]

O próprio usuário pode excluir a conta nas configurações da conta. Quando ele faz isso, o perfil, os itens e as respectivas fotos, e o lugar dele nas filas são excluídos. Os pedidos pendentes e aprovados dele são encerrados, e o texto das mensagens que ele enviou é substituído por "[message removed]". Os registros de empréstimos (nome do item, datas, valor por danos, notas de danos e status), as mensagens que a outra pessoa enviou nas conversas dele e as denúncias são mantidos, mas deixam de estar vinculados a ele. O usuário não pode excluir a conta enquanto tiver itens entregues no momento. [TO CONFIRM: por quanto tempo os logs e os registros mantidos são guardados. O advogado deve verificar eventuais obrigações legais de retenção. Baseado em supabase/05-messages-and-deletion.sql, que ainda não foi executado.]

## Escolhas do usuário

O usuário pode editar o perfil e as publicações dele no app e excluir a conta a qualquer momento. Para outras dúvidas sobre os dados dele, o usuário pode falar conosco em [contact email].

## Idade

O site é para pessoas com 18 anos ou mais. Não coletamos conscientemente dados de ninguém com menos de 18 anos.

## Alterações

Podemos atualizar esta política e, quando fizermos isso, vamos alterar a data acima.

## Contato

[contact email]
