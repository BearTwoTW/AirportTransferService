using Microsoft.AspNetCore.Mvc;

namespace AirportTransferService.Controllers
{
    [ApiController]
    public class ErrorsController : ControllerBase
    {
        [Route("/error")]
        [HttpPost]
        public IActionResult Error()
        {
            return Problem();
        }
    }
}
