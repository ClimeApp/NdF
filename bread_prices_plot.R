library(readr)
library(ggplot2)

df <- read_delim("data/AverageBreadPrice.csv", show_col_types = FALSE)

# Plot
range_price <- range(df$Var1_Average_Bread_Price, na.rm = TRUE)
range_temp <- range(df$Var2_MeanTemp, na.rm = TRUE)
scale_factor <- diff(range_price) / diff(range_temp)
offset <- range_price[1] - scale_factor * range_temp[1]

ggplot(df, aes(x = Year)) +
  annotate("rect",
           xmin = 1812, xmax = 1819,
           ymin = -Inf, ymax = Inf,
           fill = "lemonchiffon", alpha = 0.9) +
  geom_line(aes(y = Var1_Average_Bread_Price, color = "Brotpreis"), linewidth = 0.8) +
  geom_line(aes(y = Var2_MeanTemp * scale_factor + offset, color = "Temperatur"),
            linewidth = 0.8) +
  
  scale_y_continuous(
    name = "Durchschnittlicher Brotpreis (Rp.)",
    sec.axis = sec_axis(~ (. - offset) / scale_factor,
                        name = "Temperatur (°C)",
                        breaks = seq(floor(min(range_temp)), ceiling(max(range_temp)), 1))
  ) +
  
  scale_x_continuous(
    breaks = c(1750, 1775, 1800, 1816, 1825, 1850),
    labels = c("1750", "1775", "1800", "1816", "1825", "1850")
  ) +
  
  scale_color_manual(name = NULL,
                     values = c("Brotpreis" = "darkred",
                                "Temperatur" = "royalblue4"),
                     labels = c("Temperatur" = "Temperatur",
                                "Brotpreis" = "Brotpreis (gelaggt)")) +
  theme_minimal(base_size = 15) +
  labs(x = "Jahr") +
  theme(
    legend.position = "top",
    legend.text = element_text(size = 15),
    axis.text.x = element_text(size = 14),
    axis.text.y = element_text(size = 15),
    axis.title.y.left  = element_text(color = "darkred"),
    axis.title.y.right = element_text(color = "royalblue4")
  ) -> p

ggsave("images/bread_prices.png", p,
       width = 8, height = 5, dpi = 300)




df <- read_delim("data/vulkane.csv", show_col_types = FALSE)

range_temp <- range(df$Var1_Mean, na.rm = TRUE)   # Durchschnittliche Temperatur
range_saod <- range(df$SAOD, na.rm = TRUE)        # Annual global mean SAOD

scale_factor <- diff(range_temp) / diff(range_saod)
offset <- range_temp[1] - scale_factor * range_saod[1]

ggplot(df, aes(x = Year)) +
  geom_line(aes(y = Var1_Mean, color = "Temperatur"), linewidth = 0.8) +
  geom_line(aes(y = SAOD * scale_factor + offset, color = "SAOD"), linewidth = 0.8) +
  
  scale_y_continuous(
    name = "Temperatur (°C)",
    sec.axis = sec_axis(~ (. - offset) / scale_factor,
                        name = "Stratosphärische Aerosole (SAOD)")
  ) +
  scale_x_continuous(
    breaks = seq(1450, 2000, 100),
    limits = c(1422, 2008)
  ) +
  scale_color_manual(
    name = NULL,
    values = c("Temperatur" = "royalblue4",
               "SAOD"       = "#996600"),
    labels = c("Temperatur" = "Temperatur",
               "SAOD" = "Stratosphärische Aerosole (SAOD)")
  ) +
  labs(x = "Jahr") +
  theme_minimal(base_size = 15) +
  theme(
    legend.position    = "top",
    legend.text        = element_text(size = 15),
    axis.text.x        = element_text(size = 14),
    axis.text.y        = element_text(size = 15),
    axis.title.y.left  = element_text(color = "royalblue4"),
    axis.title.y.right = element_text(color = "#664400")
  ) -> p

ggsave("images/vulkane.png", p,
       width = 8, height = 5, dpi = 300)
