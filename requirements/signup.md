# Cadastro ✅ ❌

> ## Caso de sucesso

01. ❌ Recebe uma requisição do tipo **POST** na rota **/api/signup**
00. ✅ Valida dados obrigatórios **name**, **email**, **password** e **passwordConfirmation**
00. ✅ Valida que **password** e **passwordConfirmation** são iguais
00. ✅ Valida que o campo **email** é um e-mail válido
00. ✅ **Valida** se já existe um usuário com o email fornecido
00. ✅ Gera uma senha **criptografada** (essa senha não pode ser descriptografada)
00. ✅ **Cria** uma conta para o usuário com os dados informados, **substituindo** a senha pela senha criptorafada
00. ✅ Gera um **token** de acesso a partir do ID do usuário
00. ✅ Retorna **201** com o token de acesso e o nome do usuário

> ## Exceções

01. ✅ Retorna erro **400** se name, email, password ou passwordConfirmation não forem fornecidos pelo client
00. ✅ Retorna erro **400** se password e passwordConfirmation não forem iguais
00. ✅ Retorna erro **400** se o campo email for um e-mail inválido
00. ✅ Retorna erro **403** se o email fornecido já estiver em uso
00. ✅ Retorna erro **500** se der erro ao tentar gerar uma senha criptografada
00. ✅ Retorna erro **500** se der erro ao tentar criar a conta do usuário
00. ✅ Retorna erro **500** se der erro ao tentar gerar o token de acesso
