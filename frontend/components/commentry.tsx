interface CommentaryProps {
  commentary: string;
}

const Commentary = ({ commentary }: CommentaryProps) => {
  return (
    <div>
      <div className="text-center mt-[5rem] font-bold">
        Commentry: <p className="text-lg">{commentary}</p>
      </div>
    </div>
  );
};

export default Commentary;
