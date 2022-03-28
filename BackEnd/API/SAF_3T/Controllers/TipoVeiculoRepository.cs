using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Controllers
{
    public class TipoVeiculoRepository : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
