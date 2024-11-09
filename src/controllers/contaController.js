const prisma = require("../config/database");

exports.createConta = async (req, res) => {
  const { descricao, valor, vencimento, usuarioId } = req.body;
  try {
    const novaConta = await prisma.conta.create({
      data: { descricao, valor, vencimento: new Date(vencimento), usuarioId },
    });
    res.status(201).json(novaConta);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar a conta." });
  }
};

exports.getContas = async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const contas = await prisma.conta.findMany({ where: { usuarioId: Number(usuarioId) } });
    res.json(contas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar as contas." });
  }
};

exports.updateContaStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const contaAtualizada = await prisma.conta.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.json(contaAtualizada);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar a conta." });
  }
};

exports.deleteConta = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.conta.delete({ where: { id: Number(id) } });
    res.json({ message: "Conta removida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover a conta." });
  }
};
