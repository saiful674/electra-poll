import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const ResultChart = ({ questionData }) => {
  const data = questionData.options.map((option) => ({
    name: option.option,
    value: 5,
  }));
  const COLORS = [  '#4CAF50',  '#9C27B0', '#F44336', '#00BCD4', '#673AB7' ,'#FF6384', '#36A2EB', '#FFCE56', '#FF7043', '#90A4AE',  ];


  return (
    <div className="w-full grid md:grid-cols-2 gap-5">
      <div className="mt-10 space-y-2">
        <h5 className="text-xl font-semibold">Options/Candidates:</h5>
        {
          data.map((entry, index) => <p key={index}>{index + 1}. {entry.name} ({entry.value})</p>)
        }
      </div>
      {/* chart  */}
      <div className=" flex flex-col items-center ">
        <ResponsiveContainer width="80%" height={200}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />

          </PieChart>
        </ResponsiveContainer>
        <div className='text-right'>
          {data.map((entry, index) => (
            <div key={index} className='flex items-center gap-3'>
              <div style={{ backgroundColor: COLORS[index % COLORS.length] }} className='w-4 h-4 rounded-full'></div>
              <p className='mt-1'>{entry.name}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
};

export default ResultChart;
