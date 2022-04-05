using SAF_3T.Domains;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    interface ICarroceriaRepository
    {
        List<Carrocerium> Listar();

        Carrocerium BuscarPorId(int IdCarroceria);
        void Cadastrar(Carrocerium novaCarroceria);

        void Deletar(int id);
    }
}