class Kunden
{
    constructor()
    {
        this.Page = 0;
        this.Items = 5;
        this.SearchText = null;
    }

    async LoadKundenAsync(clear)
    {
        var url = `Prospects?Items=${this.Items}&Page=${this.Page}`;
        if (this.SearchText != null && this.SearchText != "")
        {
            url += "&SearchTerm=" + this.SearchText;
        }

        if (clear)
        {
            this.Page = 0;
        }

        await Api.GetApiAsync(url, User.GetCurrentUserToken())
        .then(kundenliste =>
            {
                if (clear) 
                {
                    Html.ClearRows("#Grid");
                }

                if (kundenliste.length < this.Items)
                {
                    $("#NextResult").hide();
                }
                else
                {
                    $("#NextResult").show();
                }

                kundenliste.forEach(entity => 
                {
                    var name = entity.Company;
                    if (name == undefined || name == null || name == "")
                    {
                        name = entity.FirstName + " " + entity.LastName;
                    }

                    var model = {
                        Name : name,
                        Telefon1 : entity.Contact.TelephoneNumber1,
                        Telefon2 : entity.Contact.TelephoneNumber2,
                        Mail1 : entity.Contact.EMail1,
                        Mail2 : entity.Contact.EMail2
                    };


                    Html.AppendRow("#Grid", model, clear);
                });
            });
    }

    static Run()
    {
        Application.SetSubtitle("Lieferanten");
        var kunden = new Kunden();
        kunden.LoadKundenAsync();
        Html.HandleClick("#NextResult", function(element)
        {
            kunden.Page++;
            kunden.LoadKundenAsync(false);
        });

        Html.HandleInput("#SearchText", function(data)
        {
            kunden.Page = 0;
            kunden.SearchText = data;
            kunden.LoadKundenAsync(true);
        });
    }
}

Kunden.Run();