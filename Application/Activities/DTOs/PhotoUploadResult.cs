using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.DTOs;
public class PhotoUploadResult
{
   // public string Id { get; set; } = string.Empty;
    public required string Url { get; set; } = string.Empty;
    public required string PublicId { get; set; } = string.Empty;
    //public bool IsMain { get; set; } = false;
}
