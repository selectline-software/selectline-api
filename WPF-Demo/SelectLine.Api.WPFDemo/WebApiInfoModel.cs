namespace SelectLine.Api.WPFDemo
{
    using System;

    /// <summary>
    /// The web api info model.
    /// </summary>
    public class WebApiInfoModel
    {
        /// <summary>
        /// Gets or sets the company.
        /// </summary>
        public String Company { get; set; }

        /// <summary>
        /// Gets or sets the product.
        /// </summary>
        public String Product { get; set; }

        /// <summary>
        /// Gets or sets the description.
        /// </summary>
        public String Description { get; set; }

        /// <summary>
        /// Gets or sets the version.
        /// </summary>
        public String Version { get; set; }

        /// <summary>
        /// Gets or sets the builddate.
        /// </summary>
        public String BuildDate { get; set; }

        /// <summary>
        /// The to string.
        /// </summary>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        public override String ToString()
        {
            return String.Format(
                "{0} {1} Version: {2}   -    \"{3}\"",
                this.Company,
                this.Product,
                this.Version,
                this.Description);
        }
    }
}