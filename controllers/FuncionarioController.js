const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async listarFuncionarios(req,res){
        try{
            const funcionarios = await prisma.funcionario.findMany();
            res.status(200).json(funcionarios);
        }catch(error){
            res.status(500).json({ message: "Erro ao listar os funcionarios" });
        }
    },

    async inserirFuncionario(req,res){
        try{
            const { matricula, nome, email, salario_bruto } = req.body;
            const novoFuncionario = await prisma.funcionario.create(
                {
                    data: {
                        matricula, nome, email, salario_bruto
                    }
                }
            )

            res.status(201).json({ message: "Funcionario inserido com sucesso" });
        }catch(error){
            res.status(500).json({ message: "Erro ao inserir funcionario" });
        }
    },

    async deletarFuncionario(req,res){
        try{
            const id = req.params.id;
            await prisma.funcionario.delete(
                {
                    where: {
                        id: Number(id)
                    }
                }
            );
            res.status(204).json({message: "Funcionario removido com sucesso"});
        }catch(error){
            res.status(500).json({message: "Erro ao deletar funcionário"})
        }
    },

    async atualizarFuncionario(req,res){
        try{
            const { id } = req.params;
            const { matricula, nome, email, salario_bruto} = req.body;
            const funcionario = await prisma.funcionario.update(
                {
                    where: {
                        id: Number(id)
                    },
                    data: {
                        matricula,
                        nome,
                        email,
                        salario_bruto
                    }
                }
            )
            res.status(202).json({ message: "Atualização realizada com sucesso." });
        }catch(error){
            res.status(500).json({ message: "Erro ao atualizar funcionario." })
        }
    }
}