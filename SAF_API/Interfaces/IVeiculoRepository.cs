using SAF_3T.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    interface IVeiculoRepository
    {
        List<Veiculo> Listar();
        Veiculo BuscarPorId(int idTipoVeiculo);
        List<Veiculo> BuscarPorMarca(int idMarca);
        void AtualizarStatus(int id, Veiculo veiculoAtualizado);
        Veiculo BuscarPorCarroceria(byte idTipoCarroceria);
        Veiculo BuscarPorPlaca(string Placa);
        Veiculo Cadastrar(Veiculo novoVeiculo);
        void Atualizar(int id, Veiculo veiculoAtualizado);
        void Deletar(int id);
        void DeletarImagem(int idRecebido);
        void AtualizarImagem(int idRecebido, string arquivo);
        List<Veiculo> ListarPorStatus(int idRecebido);
        bool VerificaDisponibilidade(Veiculo tentativaCadastroVeiculo);
    }
}
