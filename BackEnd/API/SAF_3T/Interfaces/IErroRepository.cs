using SAF_3T.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    interface IErroRepository
    {
        void Cadastrar(TabelaErro novoErro);
        void Deletar(int idRecebido);
        List<TabelaErro> ListarTodos();
        TabelaErro BuscarPorId(int idRecebido);
        List<TabelaErro> ListarMinhas(int idCheckList);
    }
}
