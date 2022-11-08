using SAF_3T.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    interface IMarcaRepository
    {
        List<Marca> ListarTodas();
        Marca ListarPorId(int idMarca);
        void Deletar(int idMarca);
        void CadastrarMarca(Marca novaMarca);
    }
}
