using SAF_3T.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    interface ITipoStatusRepository
    {
        List<TipoStatus> ListarTudo();
        void Cadastrar(TipoStatus novoStatus);
        void Deletar(int idTipoStatus);
    }
}
