using SAF_3T.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    interface ITipoVeiculoRepository
    {
        List<TipoVeiculo> Listar();

        TipoVeiculo BuscarPorId(int idTipoVeiculo);

        void Cadastrar(TipoVeiculo novoVeiculo);

        void Atualizar(int id, TipoVeiculo veiculoAtualizado);

        void Deletar(int id);
    }
}