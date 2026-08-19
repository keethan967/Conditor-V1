"use client";

import { useState } from "react";

import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { IndustryBadge, StageBadge } from "@/components/entity/taxonomy-badges";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { APPLICATIONS, type Application } from "@/lib/mock-data";
import { formatDate } from "@/utils/format";

const STATUSES: Application["status"][] = ["pending", "reviewing", "interview", "accepted", "rejected"];

const STATUS_LABELS: Record<Application["status"], string> = {
  pending: "New",
  reviewing: "Reviewing",
  interview: "Interview",
  accepted: "Accepted",
  rejected: "Not a fit",
};

const STATUS_TONE: Record<Application["status"], "secondary" | "outline" | "destructive" | "default"> = {
  pending: "outline",
  reviewing: "secondary",
  interview: "default",
  accepted: "default",
  rejected: "destructive",
};

export function ApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>(APPLICATIONS);
  const [filter, setFilter] = useState<"all" | Application["status"]>("all");

  const visible = filter === "all" ? applications : applications.filter((app) => app.status === filter);

  function setStatus(id: string, status: Application["status"]) {
    setApplications((current) => current.map((app) => (app.id === id ? { ...app, status } : app)));
  }

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
        <TabsList className="w-full justify-start overflow-x-auto sm:w-fit">
          <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
          {STATUSES.map((status) => (
            <TabsTrigger key={status} value={status}>
              {STATUS_LABELS[status]} ({applications.filter((app) => app.status === status).length})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="min-w-0 rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Startup</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Match</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((application) => (
              <TableRow key={application.id}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <PersonaAvatar name={application.founderName} hue={200} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{application.startupName}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {application.founderName}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <IndustryBadge industry={application.industry} />
                </TableCell>
                <TableCell>
                  <StageBadge stage={application.stage} />
                </TableCell>
                <TableCell className="tabular text-sm text-muted-foreground">
                  {formatDate(application.submittedAt)}
                </TableCell>
                <TableCell className="tabular text-sm font-medium">{application.fitScore}%</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button type="button">
                        <Badge variant={STATUS_TONE[application.status]} className="cursor-pointer">
                          {STATUS_LABELS[application.status]}
                        </Badge>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {STATUSES.map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onSelect={() => setStatus(application.id, status)}
                        >
                          {STATUS_LABELS[status]}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
