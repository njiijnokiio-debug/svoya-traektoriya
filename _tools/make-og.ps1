Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$fontPath = Join-Path $env:TEMP 'Onest.ttf'
$pfc = New-Object System.Drawing.Text.PrivateFontCollection
$pfc.AddFontFile($fontPath)
$family = $pfc.Families[0]

$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap $W, $H
$bmp.SetResolution(96, 96)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$green = [System.Drawing.ColorTranslator]::FromHtml('#1c312c')
$greenSoft = [System.Drawing.ColorTranslator]::FromHtml('#2a463f')
$yellow = [System.Drawing.ColorTranslator]::FromHtml('#f5ce44')
$white = [System.Drawing.Color]::White
$muted = [System.Drawing.ColorTranslator]::FromHtml('#cfe0cb')

$g.Clear($green)

# Photo on the right
$photo = [System.Drawing.Image]::FromFile((Join-Path $root 'assets\img\photo-kids-hands-up-16x9.jpg'))
$srcRect = New-Object System.Drawing.Rectangle 411, 0, 1097, 1080
$dstRect = New-Object System.Drawing.Rectangle 560, 0, 640, 630
$g.DrawImage($photo, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$photo.Dispose()

# Logo card (cropped above the tiny tagline)
$logo = [System.Drawing.Image]::FromFile((Join-Path $root 'assets\img\logo-vertical-yellow.png'))
$logoSrc = [System.Drawing.Rectangle]::new(0, 0, 800, 500)
$logoDst = [System.Drawing.Rectangle]::new(48, 44, 360, 225)
$g.DrawImage($logo, $logoDst, $logoSrc, [System.Drawing.GraphicsUnit]::Pixel)
$logo.Dispose()

$fmt = [System.Drawing.StringFormat]::new()
$fmt.FormatFlags = [System.Drawing.StringFormatFlags]::MeasureTrailingSpaces

function Draw-Text($text, $size, $style, $color, $x, $y, $w, $h) {
  $font = [System.Drawing.Font]::new($family, [single]$size, $style, [System.Drawing.GraphicsUnit]::Pixel)
  $brush = [System.Drawing.SolidBrush]::new($color)
  $rect = [System.Drawing.RectangleF]::new([single]$x, [single]$y, [single]$w, [single]$h)
  $g.DrawString($text, $font, $brush, $rect, $fmt)
  $brush.Dispose()
  $font.Dispose()
}

Draw-Text "Каждый ребёнок —" 46 ([System.Drawing.FontStyle]::Regular) $white 50 320 500 58
Draw-Text "своя траектория" 46 ([System.Drawing.FontStyle]::Regular) $yellow 50 378 500 58
Draw-Text "Центр речи, развития" 22 ([System.Drawing.FontStyle]::Regular) $muted 52 462 470 34
Draw-Text "и семейного образования" 22 ([System.Drawing.FontStyle]::Regular) $muted 52 494 470 34

# Accent and address
$accentBrush = [System.Drawing.SolidBrush]::new($yellow)
$g.FillRectangle($accentBrush, 54, 552, 64, 4)
$accentBrush.Dispose()
Draw-Text "Москва · м. Текстильщики / Кузьминки" 16 ([System.Drawing.FontStyle]::Regular) $muted 52 572 480 26
Draw-Text "ул. Васильцовский стан, 5, к. 2" 16 ([System.Drawing.FontStyle]::Regular) $muted 52 598 480 26

$g.Dispose()
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 92L
$out = Join-Path $root 'assets\img\og-cover.jpg'
$bmp.Save($out, $enc, $params)
$bmp.Dispose()
$pfc.Dispose()
Get-Item $out | Select-Object Length, FullName | Format-List
