using SAF_3T.Domains;
using System.Collections.Generic;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    interface ICarroceriaRepository
    {
        List<Carroceria> Listar();

        Carroceria BuscarPorId(int IdCarroceria);

        Carroceria BuscarPorTipoCarga(string IdTipoCarga);

        Carroceria BuscarPorTipoCarroceria(string IdTipoCarroceria);

        Carroceria BuscarPorCubagem(string Cubagem);

        Carroceria BuscarPorPeso(string Peso);
    }
}