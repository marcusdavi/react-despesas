
  export function formatNumber(number: number) {
    return `R$ ${formatNumberBr(number)}`;
  }

  function formatNumberBr(number: number) {
    return parseFloat(number.toFixed(2)).toLocaleString("pt-BR", {
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  }

