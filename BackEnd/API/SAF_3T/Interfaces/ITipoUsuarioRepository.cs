using SAF_3T.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    interface ITipoUsuarioRepository
    {
        void Cadastrar(TipoUsuario novoTipoU);
        void Deletar(int tipoU);
        List<TipoUsuario> ListarTodos();
    }
}
