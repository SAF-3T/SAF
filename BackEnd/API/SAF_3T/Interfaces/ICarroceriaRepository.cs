using System.Collections.Generic;

namespace SAF_3T.Interfaces
{
    interface Carroceria
    {
        List<Carroceria> Listar();

        Carroceria BuscarPorId(int IdCarroceria);

        Carroceria BuscarPorTipoCarga(string IdTipoCarga);

        Carroceria BuscarPorTipoCarroceria(string IdTipoCarroceria);

        Carroceria BuscarPorCubagem(string Cubagem);

        Carroceria BuscarPorPeso(string Peso);
    }
}