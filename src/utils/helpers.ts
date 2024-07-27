export function getStatus(openingHour: any, closingHour: any) {
    const currentHour = new Date().getHours()
    if (currentHour >= openingHour && currentHour < closingHour) {
      return { text: 'Открыто', color: '#00C036' };
    } else {
      return { text: `Закрыто до ${openingHour}:00`, color: '#FF0000' };
    }
  }