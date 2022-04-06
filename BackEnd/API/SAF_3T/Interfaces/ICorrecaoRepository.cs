using SAF_3T.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    interface ICorrecaoRepository
    {
        void Cadastrar(TabelaCorrecao novoCorrecao);
        void Deletar(int idRecebido);
        List<TabelaCorrecao> ListarTodos();
        TabelaCorrecao BuscarPorId(int idRecebido);
        List<TabelaCorrecao> ListarMinhas(int idCheckList);
    }
}
