using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class TipoCheckList
    {
        public TipoCheckList()
        {
            CheckLists = new HashSet<CheckList>();
        }

        public byte IdTipoCheckList { get; set; }
        public string NomeTipoCheckList { get; set; }

        public virtual ICollection<CheckList> CheckLists { get; set; }
    }
}
