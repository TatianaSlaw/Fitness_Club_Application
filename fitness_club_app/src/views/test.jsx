<tr>
    <td>Weight</td>
    {dates
        .slice()
        .sort((a, b) => new Date(b) - new Date(a))
        .map((date, index, array) => {
            const result = results.find((r) => r.test_date === date);
            let difference = "";
            if (index > 0) {
                const previousResult = results.find((r) => r.test_date === array[index - 1]);
                if (result && previousResult) {
                    difference = result.weightviousResult.weight;
                }
            }
            return [
                <td key={date}>{result ? result.weight : ""}</td>,
                <td key={`${date}-diff`}>{difference}</td>
            ];
        })}
</tr>
