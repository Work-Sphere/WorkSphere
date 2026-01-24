using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserAuthApi.Models
{
    [Table("city")]
    public class City
    {
        [Key]
        [Column("city_id")]
        public int CityId { get; set; }

        [Column("state_id")]
        public int StateId { get; set; }

        [Column("city_name")]
        public string CityName { get; set; }
    }
}
