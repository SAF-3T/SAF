using Microsoft.EntityFrameworkCore;
using SAF_3T.Contexts;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Repositories
{
    public class CheckListRepository : ICheckListRepository
    {
        SAFContext ctx = new SAFContext();

        public CheckList BuscaPorId(int idRecebido)
        {
            return ctx.CheckLists.Include(x => x.IdTipoCheckListNavigation)
                            .Select(x => new CheckList()
                            {
                                IdCheckList = x.IdCheckList,
                                IdTipoCheckList = x.IdTipoCheckList,
                                IdVeiculo = x.IdVeiculo,
                                IdUsuario = x.IdUsuario,
                                DataCheckList = x.DataCheckList,
                                IdTipoCheckListNavigation = new TipoCheckList()
                                {
                                    NomeTipoCheckList = x.IdTipoCheckListNavigation.NomeTipoCheckList
                                },
                                IdUsuarioNavigation = new Usuario()
                                {
                                    Nome = x.IdUsuarioNavigation.Nome,
                                    Sobrenome = x.IdUsuarioNavigation.Sobrenome,
                                    Cpf = x.IdUsuarioNavigation.Cpf,
                                    Telefone = x.IdUsuarioNavigation.Telefone,
                                    IdTipoUsuarioNavigation = new TipoUsuario()
                                    {
                                        NomeTipoUsuario = x.IdUsuarioNavigation.IdTipoUsuarioNavigation.NomeTipoUsuario
                                    },
                                },
                                IdVeiculoNavigation = new Veiculo()
                                {
                                    IdVeiculo = x.IdVeiculo,
                                    IdUsuario = x.IdUsuario,
                                    IdTipoVeiculoNavigation = new TipoVeiculo()
                                    {
                                        NomeTipoVeiculo = x.IdTipoCheckListNavigation.NomeTipoCheckList
                                    },
                                    IdMarcaNavigation = new Marca()
                                    {
                                        NomeMarca = x.
                                    },
                                    
                                    

                                }
                            }).FirstOrDefault(c => c.IdClassificado == Id);
        }

        public void Cadastrar(CheckList novaChecklist)
        {
            throw new NotImplementedException();
        }

        public void Deletar(int idRecebido)
        {
            throw new NotImplementedException();
        }

        public List<CheckList> ListarMinhas(int idUsuario)
        {
            throw new NotImplementedException();
        }

        public List<CheckList> ListarTodas()
        {
            throw new NotImplementedException();
        }
    }
}
