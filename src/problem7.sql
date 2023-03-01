SELECT balances.address
FROM balances
JOIN trades ON balances.address = trades.address
WHERE trades.block_height > 730000
GROUP BY balances.address
HAVING SUM(CASE WHEN balances.denom = 'usdc' THEN balances.amount * 0.000001 
                WHEN balances.denom = 'swth' THEN balances.amount * 0.00000005 
                WHEN balances.denom = 'tmz' THEN balances.amount * 0.003 
                ELSE 0 END) >= 500;