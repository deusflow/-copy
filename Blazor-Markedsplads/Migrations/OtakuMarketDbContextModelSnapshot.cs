﻿// <auto-generated />
using System;
using BlazorMarkedsplads;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BlazorMarkedsplads.Migrations
{
    [DbContext(typeof(OtakuMarketDbContext))]
    partial class OtakuMarketDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BlazorMarkedsplads.Models.Inventory", b =>
                {
                    b.Property<int>("InventoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("InventoryId"));

                    b.Property<int>("ItemId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("InventoryId");

                    b.HasIndex("ItemId");

                    b.HasIndex("UserId");

                    b.ToTable("Inventories");
                });

            modelBuilder.Entity("BlazorMarkedsplads.Models.Item", b =>
                {
                    b.Property<int>("ItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ItemId"));

                    b.Property<int?>("DamageMax")
                        .HasColumnType("int");

                    b.Property<int?>("DamageMin")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ItemName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ItemType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Rarity")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ItemId");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("BlazorMarkedsplads.Models.Shop", b =>
                {
                    b.Property<int>("ShopItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ShopItemId"));

                    b.Property<bool>("Available")
                        .HasColumnType("bit");

                    b.Property<int>("ItemId")
                        .HasColumnType("int");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("ShopItemId");

                    b.HasIndex("ItemId");

                    b.ToTable("Shops");
                });

            modelBuilder.Entity("BlazorMarkedsplads.Models.Trade", b =>
                {
                    b.Property<int>("TradeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TradeId"));

                    b.Property<int?>("BuyerId")
                        .HasColumnType("int");

                    b.Property<int>("ItemId")
                        .HasColumnType("int");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<int?>("SellerId")
                        .HasColumnType("int");

                    b.Property<DateTime>("TradeDate")
                        .HasColumnType("datetime2");

                    b.HasKey("TradeId");

                    b.HasIndex("BuyerId");

                    b.HasIndex("ItemId");

                    b.HasIndex("SellerId");

                    b.ToTable("Trades");
                });

            modelBuilder.Entity("BlazorMarkedsplads.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Balance")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("JoinDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BlazorMarkedsplads.Models.Inventory", b =>
                {
                    b.HasOne("BlazorMarkedsplads.Models.Item", "Item")
                        .WithMany("Inventories")
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BlazorMarkedsplads.Models.User", "User")
                        .WithMany("Inventories")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Item");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BlazorMarkedsplads.Models.Shop", b =>
                {
                    b.HasOne("BlazorMarkedsplads.Models.Item", "Item")
                        .WithMany("Shops")
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Item");
                });

            modelBuilder.Entity("BlazorMarkedsplads.Models.Trade", b =>
                {
                    b.HasOne("BlazorMarkedsplads.Models.User", "Buyer")
                        .WithMany("TradesAsBuyer")
                        .HasForeignKey("BuyerId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("BlazorMarkedsplads.Models.Item", "Item")
                        .WithMany("Trades")
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BlazorMarkedsplads.Models.User", "Seller")
                        .WithMany("TradesAsSeller")
                        .HasForeignKey("SellerId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Buyer");

                    b.Navigation("Item");

                    b.Navigation("Seller");
                });

            modelBuilder.Entity("BlazorMarkedsplads.Models.Item", b =>
                {
                    b.Navigation("Inventories");

                    b.Navigation("Shops");

                    b.Navigation("Trades");
                });

            modelBuilder.Entity("BlazorMarkedsplads.Models.User", b =>
                {
                    b.Navigation("Inventories");

                    b.Navigation("TradesAsBuyer");

                    b.Navigation("TradesAsSeller");
                });
#pragma warning restore 612, 618
        }
    }
}
