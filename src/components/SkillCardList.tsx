// src/components/HorizontalCardList.tsx
const SkillCardList = ({
    title,
    cards,
  }: {
    title: string;
    cards: { title: string; description: string }[];
  }) => {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg px-6 pb-6 hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-lg font-bold py-6">{card.title}</h3>
              <p className="text-sm text-gray-300">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SkillCardList;
  