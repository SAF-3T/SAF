using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    interface ITipoCarroceriaRepository
    {
        List<Carroceria> Listar();

        Carroceria BuscarPorNomeCarroceria(string NomeTipoCarroceria);


    }
}
