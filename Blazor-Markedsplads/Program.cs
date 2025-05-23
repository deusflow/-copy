using Blazor_Markedsplads.Components;
using BlazorMarkedsplads;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Microsoft.AspNetCore.Components.Web;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContextFactory<OtakuMarketDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Blazor_MarkedspladsContext")));

builder.Services.AddQuickGridEntityFrameworkAdapter();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();


// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    app.UseMigrationsEndPoint();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
