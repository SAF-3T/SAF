using SAF_3T.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    interface ITipoVeiculoRepository
    {
        List<Veiculo> Listar();

        Veiculo BuscarPorId(int idTipoVeiculo);

        Veiculo BuscarPorPlaca(string Placa);

        void Cadastrar(Veiculo novoVeiculo);

        void Atualizar(int idTipoVeiculo, Veiculo VeiculoAtualizado);

        void Deletar(int idTipoVeiculo);

    }
}
