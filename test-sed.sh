echo '<div className="text-white/80 bg-navy-950 border-white/10 text-white hover:text-white/50 group-hover:text-white/30"></div>' > test.tsx
sed -E -i 's/(([a-zA-Z-]+:)*)(text-white)(\/[0-9]+)?/\1text-foreground\4 dark:\1\3\4/g' test.tsx
cat test.tsx
