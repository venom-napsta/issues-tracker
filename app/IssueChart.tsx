"use client";

import { Card } from "@radix-ui/themes";
import React from "react";
import { BarChart, XAxis, YAxis, Bar, ResponsiveContainer } from "recharts";

interface Props {
  open: number;
  inProgess: number;
  closed: number;
}

const IssueChart = ({ open, inProgess, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgess },
    { label: "Closed", value: closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart barSize={60} width={150} height={40} data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" style={{ fill: "var(--accent-9)" }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
