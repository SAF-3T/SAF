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

        List<Veiculo> BuscarPorCarroceria(int idTipoCarroceria);

        List<Veiculo> BuscarPorPlaca(string Placa);

        List<Veiculo> BuscarPorData(DateTime DataAquisicao);

        void Cadastrar(Veiculo novoVeiculo);

        void Atualizar(int id, Veiculo veiculoAtualizado);

        void Deletar(int id);
    }
}
