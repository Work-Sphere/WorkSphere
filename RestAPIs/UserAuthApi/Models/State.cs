using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserAuthApi.Models
{
    [Table("state")]
    public class State
    {
        [Key]
        [Column("state_id")]
        public int StateId { get; set; }

        [Column("stateName")]
        public string StateName { get; set; }
    }
}
